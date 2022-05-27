import React, { Fragment, ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import {ProfileStyleSheet} from "@/Static/StyleSheets/Admin/Profile";
import ProfileCover from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/Profile/Banner.png";
import ProfileImg from "@/Static/Images/StoreFront/PlutoKitchen/Dashboard/Profile/Profile.png";
import { TextInputField, Button } from 'evergreen-ui'

const ProfileScreen = (): ReactElement => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };



    return (
        <Fragment>
            <div className={ProfileStyleSheet.classes.root}>
                <div className="profile-wrapper">
                    <div className="profile-cover">
                        <div className="profile-cover-bg" style={{background: `url(${ProfileCover})`}}>
                            <div className="profile-picture">
                                <img src={ProfileImg} alt="profileImg"/>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info">
                        <div className="name">
                            <h4>Jarin Fariya Mehrin</h4>
                            <p>Ui /Ux Designer</p>
                        </div>
                        <div className="email">
                            <h4>hello@gmail.com</h4>
                            <p>Email</p>
                        </div>
                    </div>
                </div>

                <div className={"tab-section"}>
                    <Box sx={{ width: '100%'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="About" value="1"/>
                                    <Tab label="Edit Profile" value="2"/>
                                    <Tab label="Change Password" value="3"/>
                                </TabList>
                            </Box>
                            <div className={"tab-panel-container"}>
                                <TabPanel value="1">
                                    <div className="profile-about">
                                        <div className="about-heading">
                                            <h3>About</h3>
                                        </div>
                                        <div className="about-info">
                                            <h4>About Me</h4>
                                            <p className={"about-me"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequatur dicta eos, eveniet id nesciunt nihil numquam recusandae sapiente sit veniam voluptas. Deleniti, eius ex modi numquam reiciendis sed voluptatibus.
                                            </p>
                                            <div className={"professional-skill"}>
                                                <h4>Designation</h4>
                                                <span>admin</span>
                                            </div>
                                            <div className={"personal-info"}>
                                                <h4>Personal Information</h4>
                                                <div className="personal-info-table">
                                                    <table>
                                                        <tr>
                                                            <th>Name</th>
                                                            <td> : Jarin Fariya Mehrin</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Email</th>
                                                            <td> : hello@gmail.com</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Availability</th>
                                                            <td> : Full Time</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Age</th>
                                                            <td> : 27</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Location</th>
                                                            <td> : Mirpur DOHS</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Experience</th>
                                                            <td> : 07 years Experience</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel value="2">
                                    <div className={"change-password"}>
                                        <h3>Edit Profile</h3>
                                        <div className="change-pass-form">
                                            <TextInputField
                                                label="Old Password"
                                                description=""
                                                placeholder="Placeholder text"
                                                width="300px"
                                            />
                                            <TextInputField
                                                label="New Password"
                                                description=""
                                                placeholder="Placeholder text"
                                                width="300px"
                                            />
                                            <Button marginRight={16} intent="success">Confirm</Button>
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel value="3">
                                    <div className={"change-password"}>
                                        <h3>Change Your Password</h3>
                                        <div className="change-pass-form">
                                            <TextInputField
                                                label="Old Password"
                                                description=""
                                                placeholder="Placeholder text"
                                                width="300px"
                                            />
                                            <TextInputField
                                                label="New Password"
                                                description=""
                                                placeholder="Placeholder text"
                                                width="300px"
                                            />
                                            <Button marginRight={16} intent="success">Confirm</Button>
                                        </div>
                                    </div>
                                </TabPanel>
                            </div>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </Fragment>
    );
};

export { ProfileScreen };
