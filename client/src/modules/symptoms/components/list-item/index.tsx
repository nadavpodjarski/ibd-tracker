import React, { FC, useState } from "react";
import {
  ListItem,
  Grid,
  makeStyles,
  Box,
  Collapse,
  Typography,
  Divider
} from "@material-ui/core";

import ListActionButtons from "./components/action-buttons";
import Name from "./components/name";
import Description from "./components/description";
import Duration from "./components/duration";
import Scale from "./components/scale";

import { Symptom, SymptomDoc } from "../../../../types/symptoms";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    margin: "6px 0",
    boxShadow: theme.shadows[0],
    borderRadius: "4px",
    border: `1px solid ${theme.palette.divider}`
  },
  actionButtonWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
      paddingTop: 8
    }
  }
}));

const SymptomListItem: FC<{
  item: SymptomDoc;
  setDeleteSymptom: (docId: string) => void;
  setEditSymptom: (item: SymptomDoc) => void;
  setCopySymptom: (meal: Symptom) => void;
}> = ({ item, setDeleteSymptom, setEditSymptom, setCopySymptom }) => {
  const classes = useStyles();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  return (
    <Box className={classes.root}>
      <ListItem
        key={`item-${item.id}`}
        style={{
          padding: "16px 16px",
          position: "relative"
        }}
        component={Grid}
        container
      >
        <Grid container item xs alignItems="center" spacing={2}>
          <Grid item xs md={5} container alignItems="center">
            <Name name={item.symptom.name} date={item.symptom.date} />
          </Grid>
          <Grid item xs={6} md={3}>
            <Scale scale={item.symptom.scale} />
          </Grid>
          <Grid item xs={6} md={2}>
            <Duration duration={item.symptom.duration} />
          </Grid>
          <Grid item xs md={2}>
            <Description
              isAvailable={!!item.symptom.description}
              setIsOpen={setIsDescriptionOpen}
              isOpen={isDescriptionOpen}
            />
          </Grid>
        </Grid>
        <Box className={classes.actionButtonWrapper}>
          <ListActionButtons
            deleteHandler={() => setDeleteSymptom(item.id)}
            editHandler={() => setEditSymptom(item)}
            copyHanlder={() => setCopySymptom(item.symptom)}
          />
        </Box>
      </ListItem>
      <Collapse
        style={{ width: "100%", textAlignLast: "left" }}
        in={isDescriptionOpen}
      >
        <Box width="100%" padding="16px">
          <Typography color="textSecondary" style={{ fontSize: "14px" }}>
            Description
          </Typography>
          <Divider style={{ margin: "8px 0" }} />
          {item.symptom.description}
        </Box>
      </Collapse>
    </Box>
  );
};

export default SymptomListItem;
