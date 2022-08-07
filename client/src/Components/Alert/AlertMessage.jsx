import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const InfoAlert = Swal.mixin({
  toast: true,
  position: "bottom-end",
  icon: "success",
  background: "#F9F9F9",
  showConfirmButton: false,
  iconColor: "#000",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const ErrorAlert = Swal.mixin({
  icon: "warning",
  iconColor: "#FF2F2B",
  background: "#F9F9F9",
  confirmButtonColor: "#000",
});

export const WarningAlert = Swal.mixin({
  toast: true,
  position: "bottom-end",
  icon: "warning",
  iconColor: "#FF2F2B",
  background: "#F9F9F9",
  confirmButtonColor: "#000",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

