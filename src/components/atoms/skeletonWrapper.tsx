import React from "react";
import Skeleton from 'react-loading-skeleton';

export interface SkeletonWrapperProps<T> {
  skeletonProps: {
    isLoading: boolean;
    showSkeleton: boolean;
  }
  componentProps: T;
  Component: React.ComponentType;
}

export const SkeletonWrapper = <T, >(skeletonProps: SkeletonWrapperProps<T>) => {
  const { skeletonProps: { isLoading, showSkeleton }, componentProps, Component } = skeletonProps;

  return(
    showSkeleton 
    ? isLoading ? (<Skeleton/>) : (<Component {...componentProps}/>)
    : (<Component {...componentProps}/>)
  )
}