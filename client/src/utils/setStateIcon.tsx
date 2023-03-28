import { CheckFat, Pause, Wrench } from "@phosphor-icons/react";
import { StateEnum } from "../class/State";

export function setStateIcon(state: string) {
    let iconComponent = null;
    switch (state) {
      case StateEnum.Working:
        iconComponent = (
          <CheckFat size={32} style={{ color: "#2ecc71" }} weight="fill" />
        );
        break;
      case StateEnum.Idle:
        iconComponent = (
          <Pause size={32} style={{ color: "#f1c40f" }} weight="fill" />
        );
        break;
      case StateEnum.Maintenance:
        iconComponent = (
          <Wrench size={32} style={{ color: "#e74c3c" }} weight="fill" />
        );
        break;
      default:
        iconComponent = null;
    }
    return iconComponent;
  }
  