import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Dashboard from './Dashboard';

class Header extends Component {
    render() {
        return (
            <div> 
                        <div className="topbar">

                            <div className="topbar-left	d-none d-lg-block">
                                <div className="text-center">

                                <Link  to="/Dashboard" className="logo"><img src="assets/images/Macbro logo.png" height="35" alt="logo" /></Link>
                                </div>
                            </div>

                            <nav className="navbar-custom">

                                <ul className="list-inline float-right mb-0">
                                   
                                    <li className="list-inline-item dropdown notification-list">
                                        <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button"
                                            aria-haspopup="false" aria-expanded="false">
                                            <i className="mdi mdi-email-outline noti-icon"></i>
                                            <span className="badge badge-danger badge-pill noti-icon-badge">5</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg">

                                            <div className="dropdown-item noti-title">
                                                <span className="badge badge-danger float-right">367</span>
                                                <h5>Messages</h5>
                                            </div>
                                            <div className="slimscroll" style={{maxHeight:'230px'}}>

                                                <a   className="dropdown-item notify-item">
                                                    <div className="notify-icon"><img src="assets/images/users/user-2.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                                                    <p className="notify-details"><b>Charles M. Jones</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                                </a>


                                                <a   className="dropdown-item notify-item">
                                                    <div className="notify-icon"><img src="assets/images/users/user-3.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                                                    <p className="notify-details"><b>Thomas J. Mimms</b><span className="text-muted">You have 87 unread messages</span></p>
                                                </a>


                                                <a  className="dropdown-item notify-item">
                                                    <div className="notify-icon"><img src="assets/images/users/user-4.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                                                    <p className="notify-details">Luis M. Konrad<span className="text-muted">It is a long established fact that a reader will</span></p>
                                                </a>


                                                <a  className="dropdown-item notify-item">
                                                    <div className="notify-icon"><img src="assets/images/users/user-5.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                                                    <p className="notify-details"><b>Kendall E. Walker</b><span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                                </a>


                                                <a   className="dropdown-item notify-item">
                                                    <div className="notify-icon"><img src="assets/images/users/user-6.jpg" alt="user-img" className="img-fluid rounded-circle" /> </div>
                                                    <p className="notify-details"><b>David M. Ryan</b><span className="text-muted">You have 87 unread messages</span></p>
                                                </a>
                                            </div>



                                            <a  className="dropdown-item notify-all">
                                                View All
                                        </a>

                                        </div>
                                    </li>

                                    <li className="list-inline-item dropdown notification-list">
                                        <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button"
                                            aria-haspopup="false" aria-expanded="false">
                                            <i className="mdi mdi-bell-outline noti-icon"></i>
                                            <span className="badge badge-success badge-pill noti-icon-badge">3</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg">

                                            <div className="dropdown-item noti-title">
                                                <span className="badge badge-danger float-right">84</span>
                                                <h5>Notification</h5>
                                            </div>

                                            <div className="slimscroll" style={{maxHeight:'230px'}}>


                                                <a   className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-primary"><i className="mdi mdi-cart-outline"></i></div>
                                                    <p className="notify-details">Your order is placed<span className="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                                </a>


                                                <a  className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-success"><i className="mdi mdi-message"></i></div>
                                                    <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                                                </a>


                                                <a   className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-warning"><i className="mdi mdi-martini"></i></div>
                                                    <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                                                </a>

                                                <a  className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-danger"><i className="mdi mdi-message"></i></div>
                                                    <p className="notify-details">New Message received<span className="text-muted">You have 87 unread messages</span></p>
                                                </a>


                                                <a className="dropdown-item notify-item">
                                                    <div className="notify-icon bg-info"><i className="mdi mdi-martini"></i></div>
                                                    <p className="notify-details">Your item is shipped<span className="text-muted">It is a long established fact that a reader will</span></p>
                                                </a>
                                            </div>


                                            <a   className="dropdown-item notify-all">
                                                View All
                                        </a>

                                        </div>
                                    </li>

                                    <li className="list-inline-item dropdown notification-list">
                                        <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                            aria-haspopup="false" aria-expanded="false">
                                            <img src="assets/images/users/user-1.jpg" alt="user" className="rounded-circle" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                                            <Link className="dropdown-item" to="/"><i className="mdi mdi-logout m-r-5 text-muted"></i> Logout</Link>
                                        </div>
                                    </li>

                                </ul>

                                <ul className="list-inline menu-left mb-0">
                                    <li className="list-inline-item">
                                        <button type="button" className="button-menu-mobile open-left waves-effect">
                                            <i className="ion-navicon"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>

                        </div>

                    
            </div>

        );
    }
}

export default Header;