import { Types } from "mongoose";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  companys: string[];
};

export type Meet = {
  _id: Types.ObjectId;
  name: string;
  timeOfDay: string;
  weekDay: string;
  local: string;
  userId: string;
  forms: string[];
  users: string[];
  squads: string[];
};

export type Company = {
  _id: Types.ObjectId;
  name: string;
};
