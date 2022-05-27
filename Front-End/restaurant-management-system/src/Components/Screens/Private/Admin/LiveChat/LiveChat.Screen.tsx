import React, { Fragment, ReactElement } from 'react';
import {LiveChatStyleSheet} from "@/Static/StyleSheets/Admin/LiveChat";

const LiveChatScreen = (): ReactElement => {
    return (
        <Fragment>
            <div className={LiveChatStyleSheet.classes.liveChat}>
                <div className="chat-stream">
                    <div className="chat">
                        <div className="chat-header anim">
                            Live Chat
                            <span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M14.212 7.762c0 2.644-2.163 4.763-4.863 4.763-2.698 0-4.863-2.119-4.863-4.763C4.486 5.12 6.651 3 9.35 3c2.7 0 4.863 2.119 4.863 4.762zM2 17.917c0-2.447 3.386-3.06 7.35-3.06 3.985 0 7.349.634 7.349 3.083 0 2.448-3.386 3.06-7.35 3.06C5.364 21 2 20.367 2 17.917zM16.173 7.85a6.368 6.368 0 01-1.137 3.646c-.075.107-.008.252.123.275.182.03.369.048.56.052 1.898.048 3.601-1.148 4.072-2.95.697-2.675-1.35-5.077-3.957-5.077a4.16 4.16 0 00-.818.082c-.036.008-.075.025-.095.055-.025.04-.007.09.019.124a6.414 6.414 0 011.233 3.793zm3.144 5.853c1.276.245 2.115.742 2.462 1.467a2.107 2.107 0 010 1.878c-.531 1.123-2.245 1.485-2.912 1.578a.207.207 0 01-.234-.232c.34-3.113-2.367-4.588-3.067-4.927-.03-.017-.036-.04-.034-.055.002-.01.015-.025.038-.028 1.515-.028 3.145.176 3.747.32z"
                                  />
                                </svg>
                                15,988 people
                              </span>
                        </div>
                        <div className="message-container">
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name"> Wijaya Adabi</div>
                                    <div className="msg__content video-p-sub">
                                        {" "}
                                        Lorem ipsum clor sit, ame conse quae debitis
                                    </div>
                                </div>
                            </div>
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name offline">
                                        {" "}
                                        Johny Wise
                                    </div>
                                    <div className="msg__content video-p-sub">
                                        {" "}
                                        Suscipit eos atque voluptates labore
                                    </div>
                                </div>
                            </div>
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fG1lbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name offline">
                                        {" "}
                                        Budi Hakim
                                    </div>
                                    <div className="msg__content video-p-sub">
                                        Dicta quidem sunt adipisci
                                    </div>
                                </div>
                            </div>
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.pexels.com/photos/1870163/pexels-photo-1870163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name"> Thomas Hope</div>
                                    <div className="msg__content video-p-sub">
                                        {" "}
                                        recusandae doloremque aperiam alias molestias
                                    </div>
                                </div>
                            </div>
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name"> Gerard Will</div>
                                    <div className="msg__content video-p-sub">
                                        Dicta quidem sunt adipisci
                                    </div>
                                </div>
                            </div>
                            <div className="message anim">
                                <div className="author-img__wrapper video-author video-p">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-check"
                                    >
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                    <img
                                        className="author-img"
                                        src="https://images.pexels.com/photos/2889942/pexels-photo-2889942.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    />
                                </div>
                                <div className="msg-wrapper">
                                    <div className="msg__name video-p-name offline">
                                        Johny Wise
                                    </div>
                                    <div className="msg__content video-p-sub">
                                        {" "}
                                        recusandae doloremque aperiam alias molestias
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-footer anim">
                            <input type="text" placeholder="Write your message"/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export { LiveChatScreen };
