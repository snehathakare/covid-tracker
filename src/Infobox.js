import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Infobox.css';

function Infobox({title, cases, isRed, active, total, ...props}) {

  return (
      <Card onClick={props.onClick} className={`infobox ${active && `infobox--selected`} ${isRed && `infobox--red`}`}>
        <CardContent>
          <Typography  className="infobox__title" color="textSecondary">{title}</Typography>
          <h2 className={`infobox__cases ${!isRed && `infobox_cases--green`}`}>{cases}</h2>
          <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
        </CardContent>
      </Card>
  );
}

export default Infobox;