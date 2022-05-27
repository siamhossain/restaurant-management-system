import {css} from "@emotion/css";

export const LiveChatStyleSheet = {
    classes: {
        root: css`
            
        `,
        liveChat: css`
            .chat-stream {
              flex-grow: 1;
              margin-left: 30px;
              width: 320px;
            }
            .chat {
              background-color: #252836;
              border-radius: 20px;
              padding: 0 20px;
              max-height: 414px;
              overflow: auto;
              ::-webkit-scrollbar {
                  width: 6px;
                  border-radius: 10px;
              }
                
              ::-webkit-scrollbar-thumb {
                  background-color: rgb(21 20 26 / 63%);
                  border-radius: 10px;
              }
              &-footer {
                display: flex;
                align-items: center;
                position: sticky;
                bottom: 0;
                left: 0;
                width: calc(100% + 20px);
                padding-bottom: 12px;
                background-color: #252836;
                z-index: 100;
                input {
                  width: 100%;
                  border: 0;
                  background-color: #2d303e;
                  border-radius: 20px;
                  font-size: 12px;
                  color: #fff;
                  margin-left: -10px;
                  padding: 12px 40px;
                  font-weight: 500;
                  font-family: var(--body-font);
                  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 12C2 6.48 6.47 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10C6.47 22 2 17.52 2 12zm5.52 1.2c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.19.54 1.19 1.2 0 .66-.53 1.2-1.19 1.2zM10.8 12c0 .66.54 1.2 1.2 1.2.66 0 1.19-.54 1.19-1.2a1.194 1.194 0 10-2.39 0zm4.48 0a1.195 1.195 0 102.39 0 1.194 1.194 0 10-2.39 0z' fill='%236c6e78'/%3e%3c/svg%3e");
                  background-repeat: no-repeat;
                  background-size: 24px;
                  background-position: 8px;
                  &::placeholder {
                    color: #6c6e78;
                  }
                }
                &:before {
                  content: "";
                  position: absolute;
                  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21.435 2.582a1.933 1.933 0 00-1.93-.503L3.408 6.759a1.92 1.92 0 00-1.384 1.522c-.142.75.355 1.704 1.003 2.102l5.033 3.094a1.304 1.304 0 001.61-.194l5.763-5.799a.734.734 0 011.06 0c.29.292.29.765 0 1.067l-5.773 5.8c-.428.43-.508 1.1-.193 1.62l3.075 5.083c.36.604.98.946 1.66.946.08 0 .17 0 .251-.01.78-.1 1.4-.634 1.63-1.39l4.773-16.075c.21-.685.02-1.43-.48-1.943z'/%3e%3c/svg%3e");
                  background-repeat: no-repeat;
                  background-size: 14px;
                  background-position: center;
                  width: 18px;
                  height: 18px;
                  background-color: #6c5ecf;
                  padding: 4px;
                  border-radius: 50%;
                  right: 16px;
                }
              }
              &-vid {
                &__title {
                  color: #fff;
                  font-size: 18px;
                }
                &__container {
                  margin-top: 40px;
                }
                &__wrapper {
                  display: flex;
                  align-items: center;
                  margin-top: 26px;
                }
                &__name {
                  color: #fff;
                  font-size: 14px;
                  line-height: 1.3em;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  -webkit-box-orient: vertical;
                }
                &__img {
                  width: 100px;
                  height: 80px;
                  border-radius: 10px;
                  object-fit: cover;
                  object-position: right;
                  margin-right: 16px;
                  transition: 0.3s;
                  &:hover {
                    transform: scale(1.02);
                  }
                }
                &__content {
                  max-width: 20ch;
                }
                &__by,
                &__info {
                  color: var(--body-color);
                  font-size: 13px;
                }
                &__by {
                  margin: 6px 0;
                }
                &__button {
                  background-color: #6c5ecf;
                  border: 0;
                  color: #fff;
                  font-size: 13px;
                  margin-top: 26px;
                  display: flex;
                  padding: 0 10px;
                  align-items: center;
                  justify-content: center;
                  height: 40px;
                  border-radius: 10px;
                  cursor: pointer;
                  transition: 0.3s;
                  &:hover {
                    background-color: #5847d0;
                  }
                }
              }
            }
            .chat-header {
              display: flex;
              align-items: center;
              padding: 20px 0;
              font-size: 16px;
              font-weight: 600;
              color: #fff;
              position: sticky;
              top: 0;
              background-color: #252836;
              left: 0;
              z-index: 100!important;
              border-bottom: 1px solid rgb(128 129 145 / 24%);
              svg {
                width: 15px;
                margin-right: 6px;
                flex-shrink: 0;
              }
              span {
                margin-left: auto;
                color: var(--body-color);
                font-size: 12px;
                display: flex;
                align-items: center;
              }
            }
            .anim {
              animation: bottom 0.8s var(--delay) both;
            }
            .message {
              display: flex;
              align-items: center;
              margin-top: 18px;
              &:last-child {
                margin-bottom: 18px;
              }
              &-container .author-img__wrapper svg {
                width: 15px;
              }
            }
            .msg {
              &__name {
                font-size: 13px;
              }
              &__content {
                line-height: 1.4em;
                max-width: 26ch;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
            .author-img__wrapper svg {
                border-color: #ffe6b2;
                color: #e7bb7d;
            }
            .video-author {
              bottom: -65px;
              transform: scale(0.6);
              right: -3px;
              z-index: 10;
            }
            .video-p {
              margin-right: 12px;
              object-fit: cover;
              flex-shrink: 0;
              border-radius: 50%;
              position: relative;
              top: 0;
              left: 0;
              .author-img {
                border: 0;
              }
              &-wrapper {
                display: flex;
                align-items: center;
                .author-img {
                  border: 0;
                }
                svg {
                  width: 20px;
                  padding: 4px;
                }
                @media screen and (max-width: 650px) {
                  flex-direction: column;
                  .button-wrapper {
                    margin: 20px auto 0;
                  }
                  .video-p-detail {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  .video-p {
                    margin-right: 0;
                  }
                }
              }
              &-sub {
                font-size: 12px;
              }
              &-title {
                font-size: 24px;
                color: #fff;
                line-height: 1.4em;
                margin: 16px 0 20px;
              }
              &-subtitle {
                font-size: 14px;
                line-height: 1.5em;
                max-width: 60ch;
                & + & {
                  margin-top: 16px;
                }
              }
              &-name {
                margin-bottom: 8px;
                color: #fff;
                display: flex;
                align-items: center;
                &:after {
                  content: "";
                  width: 6px;
                  height: 6px;
                  background-color: #22b07d;
                  border-radius: 50%;
                  margin-left: 8px;
                  display: inline-block;
                }
                &.offline:after {
                  background-color: #ff7551;
                }
              }
            }
            .author {
              &-img {
                width: 52px;
                height: 52px;
                border: 1px solid rgb(255 255 255 / 75%);
                padding: 4px;
                border-radius: 50%;
                object-fit: cover;
                &__wrapper {
                  position: relative;
                  flex-shrink: 0;
                  svg {
                    width: 16px;
                    padding: 2px;
                    background-color: #fff;
                    color: #0daabc;
                    border-radius: 50%;
                    border: 2px solid #0daabc;
                    position: absolute;
                    bottom: 5px;
                    right: 0;
                  }
                }
              }
              &-name {
                font-size: 15px;
                color: #fff;
                font-weight: 500;
                margin-bottom: 8px;
              }
              &-info {
                font-size: 13px;
                font-weight: 400;
                color: #fff;
              }
              &-detail {
                margin-left: 16px;
              }
            }
            .author-img__wrapper svg {
                border-color: #ffe6b2;
                color: #e7bb7d;
            }
            .video-p-sub {
              color: #808191;
            }
            
            


        `,
    },
    styles: {

    },
};