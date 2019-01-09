import React from "react";
import { Button, Glyphicon } from "react-bootstrap";

const LoaderButtonStyle = {
    marginRight: "7px",
    top: "2px",
    animation: "spin 1s infinite linear"
};

const spinStyle = {
    marginRight: "7px",
    top: "2px",
    animation: "spin 1s infinite linear"
};

const glyphiconStyle = {
    marginRight: "7px",
    top: "2px",
    animation: "spin 1s infinite linear"
};
const spinningStyle = `
    @keyframes spin {
        from { transform: scale(1) rotate(0deg); }
        to { transform: scale(1) rotate(360deg); }
    }
`;


export default ({
    isLoading,
    text,
    loadingText,
    className = "",
    disabled = false,
    ...props
}) =>
    <Button style = {LoaderButtonStyle} className = {`LoaderButton ${className}`}
        disabled = { disabled || isLoading }
        { ...props }
    >
        { isLoading && <Glyphicon style = {glyphiconStyle} glyph = "refresh"  
            style = {spinStyle} clasName = "spinning" />}
        { isLoading ? text : loadingText }
    </Button>;