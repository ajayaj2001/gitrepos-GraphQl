import { Button } from "@material-ui/core";

export const NavButtons = ({ start, end, next, previous, onPage }) => {
  return (
    <div>
      {previous && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPage("last", 'before: "' + start + '"')}
        >
          {"<--"}
        </Button>
      )}
      {next && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPage("first", 'after: "' + end + '"')}
        >
          {"-->"}
        </Button>
      )}
    </div>
  );
};
