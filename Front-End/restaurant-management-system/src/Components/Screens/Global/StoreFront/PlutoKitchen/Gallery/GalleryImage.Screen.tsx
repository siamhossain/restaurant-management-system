import React, { Fragment, ReactElement } from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Grid from "@material-ui/core/Grid";



interface IGalleryImageScreenProps {
src: string,
}

const GalleryImageScreen: React.FC<IGalleryImageScreenProps> = (props ): ReactElement => {

    const [isShown, setIsShown] = React.useState(false)

    return (
        <Fragment>

            <div>
                <Pane>
                    <Dialog
                        isShown={isShown}
                        width={"700px"}
                        title="Information"
                        onCloseComplete={() => setIsShown(false)}
                        // confirmLabel="Custom Label"
                        hasFooter={false}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div style={{paddingBottom: "50px"}}>
                                    <img src={props.src} alt="WingImage"/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div>
                                    <h3>Title Text</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque autem, ducimus in nemo vitae?</p>
                                </div>
                            </Grid>
                        </Grid>

                    </Dialog>

                    <div className="gallery-img" onClick={() => setIsShown(true)}>
                        <img src={props.src} alt="WingImage"/>
                    </div>
                </Pane>
            </div>


        </Fragment>
    );
};

export { GalleryImageScreen };
