import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const renderError = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) return null;

  if ('status' in error) {
    return <span>Error: {(error.data as { message?: string })?.message || 'Unknown error'}</span>;
  } else {
    return <span>Error: {error.message || 'Unknown error'}</span>;
  }
};

export default renderError;