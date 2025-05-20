export default function convertShoeSize(current, target, sizes) {
  const conversion = {
    eu: { us: (s) => s - 33, uk: (s) => s - 34 },
    us: { eu: (s) => s + 33, uk: (s) => s - 1 },
    uk: { eu: (s) => s + 34, us: (s) => s + 1 },
  };

  if (!conversion[current] || !conversion[current][target]) {
    return sizes;
  }

  return sizes.map((item) => ({
    ...item,
    size: conversion[current][target](item.size),
  }));
}
