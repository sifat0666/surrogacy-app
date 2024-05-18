import React from "react";
import { Circles } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <Circles
                    height={80}
                    width={80}
                    color="#FF414D"
                    ariaLabel="circles-loading"
                />
            </div>
        </div>
    );
};

export default Spinner;
