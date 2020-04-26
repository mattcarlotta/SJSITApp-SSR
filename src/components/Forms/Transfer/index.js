import dynamic from "next/dynamic";

const Transfer = dynamic(() => import("antd/es/transfer"), { ssr: false });

export default Transfer;
