import { TagTypes, TagTypesTranslated } from "@/enum/TagTypes";
import { Tag } from "antd";
import React from "react";

const TagsTypeToTag = ({ type }: { type: TagTypes }) => {
  const typeTranslated = TagTypesTranslated[type];

  switch (type) {
    case TagTypes.STUDENT:
      return <Tag color="blue">{typeTranslated}</Tag>;
    case TagTypes.SALES:
      return <Tag color="green">{typeTranslated}</Tag>;
    case TagTypes.COURSES:
      return <Tag color="purple">{typeTranslated}</Tag>;
    case TagTypes.ALL:
      return <Tag color="orange">{typeTranslated}</Tag>;
    default:
      return <Tag color="red">{typeTranslated}</Tag>;
  }
};

export default React.memo(TagsTypeToTag);
