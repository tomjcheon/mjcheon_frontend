import {useRouteError} from "react-router-dom";

export function DefaultPage() {
    window.location.href = "/product"

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>

        </div>
    );
}

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    window.location.href = "/product"

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}