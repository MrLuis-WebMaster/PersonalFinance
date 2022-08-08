import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const InfoAlert = Swal.mixin({
  toast: true,
  position: "bottom-end",
  icon: "success",
  background: "#F6F6F6",
  showConfirmButton: false,
  iconColor: "#3EC70B",
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'bg-alert-progress-bar',
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const ErrorAlert = Swal.mixin({
  icon: "warning",
  iconColor: "#FF2F2B",
  background: "#F6F6F6",
  confirmButtonColor: "#000",
});

export const WarningAlert = Swal.mixin({
  toast: true,
  position: "bottom-end",
  icon: "warning",
  iconColor: "#F2DF3A",
  background: "#F6F6F6",
  confirmButtonColor: "#000",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'bg-alert-progress-bar',
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

