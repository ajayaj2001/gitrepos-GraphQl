import { Button, ListItemText } from "@material-ui/core";
export const Repostiory = ({ repository }) => {
  return (
    <>
      <ListItemText>
        <h4>
          {repository.name}
          <Button
            size="small"
            variant="text"
            color="primary"
            style={{ marginLeft: "20px" }}
          >
            {repository.viewerSubscription}
          </Button>
          <Button
            size="small"
            variant={repository.licenseInfo ? "outlined" : "contained"}
            color={repository.licenseInfo ? "primary" : "secondary"}
            style={{ marginLeft: "20px" }}
          >
            {repository.licenseInfo
              ? repository?.licenseInfo.spdxId
              : "No License"}
          </Button>
        </h4>
        <h5>
          description:{" "}
          {repository.description
            ? repository.description
            : "no description found for this repositorty"}
        </h5>
        <p>
          Url: <a href={repository.url}>{repository.url}</a>
        </p>
        <p>CreatedAt: {repository.createdAt}</p>
      </ListItemText>
    </>
  );
};
