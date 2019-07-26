import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LayersIcon from '@material-ui/icons/Layers';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import { getDynamoDBCount } from '../actions/dynamodb';
import { getIAMUserCount } from '../actions/iam';
import { getS3Count } from '../actions/s3';
import { getSQSCount } from '../actions/sqs';
import { getSNSCount } from '../actions/sns';

const StyledBadge = withStyles(theme => ({
    badge: {
        top: '50%',
        right: '-2em',
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
    },
}))(Badge);

class SidebarNavigation extends Component {
    constructor(props)
    {
        super(props);

        this.props.getDynamoDBCount();
        this.props.getIAMUserCount();
        this.props.getS3Count();
        this.props.getSNSCount();
        this.props.getSQSCount();
    }

    render() {
        return (
            <List>
                <nav>
                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.notifications}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.iam}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="IAM" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.s3}>
                            <ListItemIcon>
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary="S3" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.sqs}>
                            <ListItemIcon>
                                <FormatListNumberedIcon />
                            </ListItemIcon>
                            <ListItemText primary="SQS" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.sns}>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText primary="SNS" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button>
                        <StyledBadge color="secondary" badgeContent={this.props.dynamodb}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="DynamoDB" />
                        </StyledBadge>
                    </ListItem>
                </nav>
            </List>
        )
    }
}

export default connect(
    state => {
        console.log(state);

        return {
            notifications: 10,
            iam: 3,
            s3: state.s3.count,
            sqs: 4,
            sns: 2,
            dynamodb: 5,
        };
    },
    dispatch => ({
        getNotifications: 0,
        getIAMUserCount: () => dispatch(getIAMUserCount()),
        getS3Count: () => dispatch(getS3Count()),
        getSQSCount: () => dispatch(getSQSCount()),
        getSNSCount: () => dispatch(getSNSCount()),
        getDynamoDBCount: () => dispatch(getDynamoDBCount()),
    })
)(SidebarNavigation);