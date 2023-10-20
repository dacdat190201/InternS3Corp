// import { CircularProgress } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import instance, { get } from "../axiosDomain/axiosDomain";

// const TextAxios = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState();
//   //   useEffect(() => {
//   //     instance
//   //       .get("/products/categories")
//   //       .then((res) => {
//   //         setData(res.data);
//   //         setLoading(false);
//   //       })
//   //       .catch((err) => {
//   //         window.alert(err);
//   //       });
//   //   }, []);

//   // useEffect(() => {
//   //   const fetch = async () => {
//   //     try {
//   //       const res = await get("/products/categories");
//   //       setData(res);
//   //       setLoading(false);
//   //     } catch (error) {}
//   //   };
//   //   fetch();
//   // }, []);
//   // console.log(data);

//   //   useEffect(() => {
//   //     const fetchDetail = async () => {
//   //       httpApi.get(`/Monhoc/MonhocDetails?maMh=${maMh}`).then((res) => {
//   //         if (res.data.message == "true") {
//   //           setDetail(res.data.data.dsNoiDung);
//   //           setFor1(res.data.data.dsNoiDung?.chuong[0]);
//   //           setFor2(res.data.data.dsNoiDung?.chuong[1]);
//   //           setLoading(false);
//   //         }
//   //       });
//   //     };
//   //     fetchDetail();
//   //   }, []);

//   if (loading === true) {
//     return <CircularProgress />;
//   }
//   return <div>Tdwa</div>;
// };

// export default TextAxios;
