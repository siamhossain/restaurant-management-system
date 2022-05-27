import {css} from "@emotion/css";

export const BlogDetailsStyleSheet = {
    classes: {
        root: css`
            .blog-details-section {

              .blog-details-container {
                margin-top: 70px;
                margin-bottom: 70px;
                display: inline-block;
                //width: 1250px;
                
                .blog-details-img {
                  img {
                    width: 100%;
                  }
                }

                p {
                  font-size: 13px;
                  color: rgb(91, 91, 91);
                  line-height: 2.143;
                  text-align: left;
                }

                .img-title {

                  h1 {
                    font-size: 50px;
                    color: rgb(1, 1, 1);
                    font-weight: bold;
                    margin-bottom: 0px;
                    
                    @media only screen and (max-width: 900px) {
                      font-size: 25px;
                    }
                  }
                }

                h3 {
                  font-size: 18px;
                  color: rgb(1, 1, 1);
                  line-height: 1.389;
                  text-align: left;
                  margin: 30px;
                }
                
                .blog-img {
                  img {
                    margin-top: 15px;
                    margin-bottom: 15px;
                    width: 100%;
                  }
                }
                
                .comment-container {
                  margin-top: 120px;
                  .comment-wrapper {
                    display: flex;
                    .comment-description {
                      text-align: left;
                      h1 {
                        font-size: 18px;
                        margin-left: 10px;
                        span {
                          color: #fe8840;
                          font-size: 15px;
                        }
                      }
                      p {
                        font-size: 17px;
                        line-height: 1.5;
                      }
                    }
                    .comment-discription-reply {
                      padding-left: 100px;
                    }
                  }
                }
               
               
                
            

              .blog-details-input {
                border: 1px solid #e5e4e3;
                padding: 10px 25px;
              .blog-details-input-table {
                width: 100%;
                td.search-input {
                  width: 100%;
                }
                td {
                  .ub-mb_24px {
                    margin-bottom: 8px;
                  }
                }
                input {
                  height: 40px;
                  border-radius: 0;
                  border: none;
                  background: #000;
                  color: #fff;
                  :focus {
                    box-shadow: none !important;
                  }
                }
                button {
                  height: 40px;
                  border: none;
                  background: #fe9400;
                  padding: 0px 15px;
                  font-weight: bold;
                  color: #fff;
                }
              }
            }

              .categories {
                font-size: 18px;
                color: rgb(0, 0, 0);
                line-height: 1.389;
                border-width: 1px;
                margin-top: 30px;
                text-align: left;
                padding: 25px;

                h2 {
                  font-size: 18px;
                  margin: 0;
                }

                ul.categories-item-list {
                  padding: 0;

                  li {
                    margin-bottom: 20px;
                    list-style-type: none;
                    font-size: 14px;
                    border-bottom: 1px dotted #e5e4e3;
                    padding: 5px 0px;
                    :hover {
                      a {
                        color: #fe9400;
                      }
                      span {
                        color: #000 !important;
                      }
                    }

                    span {
                      float: right;
                      background: #fe9400;
                      padding: 1px 7px;
                      border-radius: 10px;
                    }
                  }
                }
              }

              .Popular-tags {
                font-size: 18px;
                color: rgb(0, 0, 0);
                line-height: 1.389;
                border-width: 1px;
                margin-top: 30px;
                text-align: left;
                padding: 25px;
                h2 {
                  font-size: 18px;
                  margin: 0;
                  margin-bottom: 15px;
                  
                }
                .MuiChip-clickable {
                  margin-right: 5px;
                  margin-bottom: 10px;
                }
              }

              .recent-post-container {
                margin-top: 30px;
                border-width: 1px;
                padding: 25px;
                cursor: pointer;
                .post-wrapper {
                  display: flex;
                  @media only screen and (max-width: 500px) {
                    display: block !important;
                  }
                  
                  .recent-post-img {
                    padding-right: 15px;
                    padding-bottom: 10px;
                  }
                }
                h1 {
                  font-size: 18px;
                  margin: 0;
                  margin-bottom: 15px;
                }
                  .food-title {
                    h1 {
                      font-size: 14px;
                      margin-bottom: 0;
                    }
                    p{
                      margin-top: 0px;
                      margin-bottom: 30px;
                     } 
                  }
              }
              
              
              
              .comment-from-section {
                text-align: left;
                margin-top: 100px;
                h1 {
                  font-size: 30px;
                  margin-bottom: 0;
                  color: rgb(40, 41, 50);
                }
                p {
                  margin-top: 0px;
                }

                .comment-from {
                  background-color: #f2efe6;
                  padding: 15px;
                  //width: 380px;
                  //height: 580px;
                  border-radius: 10px;
                  .comment {
                    height: 200px;
                  }
                  .Name {
                    height: 50px;
                  }
                  .email {
                    height: 50px;
                  }
                  .button {
                    button {
                      background-color: #ffd400;
                      padding: 18px 35px;
                      font-size: 14px;
                      font-weight: bold;
                    }
                  }
                }
              }

          }    

        }
        `,
    },
    styles: {

    },
};