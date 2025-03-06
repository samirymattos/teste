import { TagTypes } from "@/enum/TagTypes";
import { Color } from "antd/es/color-picker";

export interface ITag {
  name: string;
  color: string;
  type: TagTypes;
  is_active: boolean;

  id: string;
  created_at: string;
  updated_at: string;
}

export type ITagCreate = Omit<ITag, "id" | "created_at" | "updated_at">;

export type ITagCreateForm = Omit<ITag, "id" | "created_at" | "updated_at"> & {
  color: Color;
};
