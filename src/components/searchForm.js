import { TextField } from "@material-ui/core";

export const SearchForm = ({
  queryString,
  pageCount,
  totalCount,
  QueryStringChange,
  totalCountChange,
  pageCountChange,
}) => {
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Search field"
          value={queryString}
          style={{ marginRight: "20px", marginLeft: "10px" }}
          onChange={(event) => QueryStringChange(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Item per page "
          variant="outlined"
          value={pageCount}
          style={{ marginRight: "20px", marginLeft: "10px" }}
          type="number"
          onChange={(event) => pageCountChange(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="OutTotal results"
          variant="outlined"
          value={totalCount ? totalCount : 0}
          style={{ marginRight: "20px", marginLeft: "10px" }}
          InputProps={{
            readOnly: true,
          }}
        />
      </form>
    </div>
  );
};
