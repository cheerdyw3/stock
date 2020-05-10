import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as stockAction from "./../../actions/stock.action";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { imageUrl } from "./../../Constants";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Stock() {
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);
  useEffect(() => {
    dispatch(stockAction.getProducts());
  }, []);

  const columns = [
    {
      title: "Id",
      cellStyle: { padding: 0 },
      render: (item) => <Typography variant="body1">{item._id}</Typography>,
    },{
      title: "Image",
      cellStyle: { padding: 0 },
      render: (item) => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },{
      title: "Name",
      cellStyle: { minWidth: 700 },
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },{
      title: "Price",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "Stock",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      ),
    },
    {
      title: "Updated",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "700",
      marginTop: 0,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={stockReducer.result ? stockReducer.result : []}
        title="Stock"
      />
    </div>
  );
}
