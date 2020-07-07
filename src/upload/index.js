import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab,Typography,Box} from '@material-ui/core'
import Auto from './autoUpload'
import Manual from './manualUpload'
import fmt from '../component/fmt-date'
import {DetailComponent} from '../component/detail/detailComponent'
import detailObj from '../component/detail/detailObj'
import PubSub from './pubsub'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight:'92%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  box:{
  width: 0,
  height: 0,
  borderWidth: '20px',
  borderStyle: 'solid',
  borderColor: 'transparent transparent red transparent',
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const detail=null;
  const id = 2;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="自动上传" {...a11yProps(0)} />
        <Tab label="手动表格上传" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Auto/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Manual/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.box}>

        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        {fmt(parseInt(new Date().getTime()/1000),'yyyy-MM-dd hh:mm:ss')}
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div>
          <DetailComponent detail={detail}  detailObj={detailObj.projectDetailObj}  title='项目信息' id={id} />
          {/* <DetailComponent detail={detail} detailObj={detailObj.dataDetailObj}  title='资料信息' downLoad={true} wrap={true} id={id} />
          <DetailComponent detail={detail}  detailObj={detailObj.InvoiceDetailObj}  title='开票信息' id={id} />
				  <DetailComponent detail={detail}  detailObj={detailObj.contacts}  title='企业联系人'id={id}  /> */}
      </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PubSub/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}