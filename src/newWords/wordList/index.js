import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableHead,TableRow,Paper} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

function createData(name, calories, fat, carbs, protein,numbers) {
    return { name, calories, fat, carbs, protein,numbers };
}
const copyFor = ()=>{
    const a = new Array(100)
    console.log(a,'a')
    let newArr = []
    a.map((item,key)=>{
        if(key%2==0&&key==0){
            newArr.push(key)
        }
        console.log(newArr)
        console.log(item,'item')
    })
}
copyFor()
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,'6%'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3,'6%'),
    createData('Eclair', 262, 16.0, 24, 6.0,'6%'),
    createData('Cupcake', 305, 3.7, 67, 4.3,'6%'),
    createData('Gingerbread', 356, 16.0, 49, 3.9,'6%'),
];

export default function SimpleTable() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>词文</TableCell>
                        <TableCell align="right">发音</TableCell>
                        <TableCell align="right">释意</TableCell>
                        <TableCell align="right">周期</TableCell>
                        <TableCell align="right">次数</TableCell>
                        <TableCell align="right">错误率</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.numbers}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}