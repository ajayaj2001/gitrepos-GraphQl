import { github } from "../db";
import { githubQuery } from "../db/query";
import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { Repostiory } from "../components/repostiory";
import { SearchForm } from "../components/searchForm";
import { NavButtons } from "../components/navButtons";

function App() {
  const [userName, setUserName] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeywork, setPaginationKeywork] = useState("first");
  const [paginationString, setPaginationString] = useState("");

  const dpFetch = () => {
    const queryText = JSON.stringify(
      githubQuery(pageCount, queryString, paginationKeywork, paginationString)
    );
    fetch(github.baseURL, {
      method: "POST",
      headers: github.header,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data?.viewer;
        const repo = data.data?.search.edges;
        const total = data.data?.search.repositoryCount;
        const start = data.data?.search.pageInfo?.startCursor;
        const end = data.data?.search.pageInfo?.endCursor;
        const next = data.data?.search.pageInfo?.hasNextPage;
        const prev = data.data?.search.pageInfo?.hasPreviousPage;

        setUserName(viewer?.name);
        setRepositories(repo);
        setTotalCount(total);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
        setStartCursor(start);
      });
  };

  useEffect(() => {
    dpFetch();
  }, [pageCount, queryString, paginationKeywork, paginationString]);
  return (
    <div>
      <h1>Welcome {userName}</h1>
      <SearchForm
        totalCount={totalCount}
        queryString={queryString}
        pageCount={pageCount}
        pageCountChange={(pageNumber) => {
          setPageCount(pageNumber);
        }}
        QueryStringChange={(newString) => {
          setQueryString(newString);
        }}
        totalCountChange={(count) => {
          setTotalCount(count);
        }}
      />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Your Repositories" />
          <Divider />
        </ListItem>
        {repositories?.map((repository) => (
          <ListItem button key={repository.node.name}>
            <Repostiory repository={repository.node} />
            <Divider />
          </ListItem>
        ))}
      </List>
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(mykeywork, mystring) => {
          setPaginationKeywork(mykeywork);
          setPaginationString(mystring);
        }}
      />
    </div>
  );
}

export default App;
