import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link rel="noopener" target="_blank" color="inherit"  href="https://github.com/MrLuis-WebMaster">
        LM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
