import { DBCollection } from "./Collection";
import { ITagCollection } from "../constants/interfaces";
import { TagType } from "Constants/types";

export class TagCollection
  extends DBCollection<TagType>
  implements ITagCollection {}
