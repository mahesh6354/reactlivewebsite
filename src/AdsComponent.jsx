import React, {useEffect } from "react";

const AdsComponent = (props) => {
    const { dataAdSlot } = props;  



    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);



    return (
        <>
        <div>
            <ins class="adsbygoogle"
     style={{display: "block"}}
     data-ad-client="ca-pub-0123456789"
     data-ad-slot="9876543210"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
            </div>
        </>
    );
};

export { AdsComponent };



