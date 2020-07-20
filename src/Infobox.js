import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function Infobox({title, cases, total}) {

  return (
    <div>
      <Card>
        <CardContent>
          <Typography className="infobox__title" color="textSecondary">{title}</Typography>
          <h2>{cases}</h2>
          <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Infobox;