import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

function NewsItem(props: any) {
  return (
    <div>
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={props.sourceName}
        color="error"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={props.imageUrl}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
          <Typography>
            <div className="m-2 text-xs">
              <strong>By:</strong> {props.author} <strong>at:</strong>{" "}
              {props.publishedAt}
            </div>
          </Typography>
          <div className="ml-2 my-2">
            <Typography>
              <Button
                variant="contained"
                href={props.url}
                target="_blank"
                size="small"
              >
                Read More
              </Button>
            </Typography>
          </div>
        </Card>
      </Badge>
    </div>
  );
}

export default NewsItem;
