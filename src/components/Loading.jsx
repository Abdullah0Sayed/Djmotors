import { InfinitySpin } from "react-loader-spinner";


function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <InfinitySpin
                visible={true}
                width="200"
                color="#FF0000"
                ariaLabel="infinity-spin-loading" />
        </div>
    );
}
export default Loading;