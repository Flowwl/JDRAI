import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  CogIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { AiFillCheckCircle, AiOutlineDownload, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLockAlt, BiLogOut, BiRefresh, BiWindowOpen } from "react-icons/bi";
import { BsFillImageFill, BsGripHorizontal, BsQuestion, BsTextareaResize, BsTextParagraph } from "react-icons/bs";
import { FaRegObjectGroup } from "react-icons/fa";
import { HiDuplicate } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { MdAlignVerticalCenter, MdErrorOutline, MdOutlineArrowRight, MdPerson } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { TbArrowCurveRight, TbEdit, TbZoomIn, TbZoomOut, TbZoomPan } from "react-icons/tb";
import { TiUploadOutline } from "react-icons/ti";

export const SvgIcons = {
  PLUS: PlusIcon,
  SEARCH: MagnifyingGlassIcon,
  CHEVRON_DOWN: ChevronDownIcon,
  CHEVRON_UP: ChevronUpIcon,
  CHEVRON_RIGHT: ChevronRightIcon,
  CHEVRON_UP_DOWN: ChevronUpDownIcon,
  CHECK: CheckIcon,
  SAVE: ArrowDownTrayIcon,
  SETTINGS: CogIcon,
  BLUEPRINT: BookOpenIcon,
  HELP: BsQuestion,
  X: XMarkIcon,
  SEND: CloudArrowUpIcon,
  IMPORT: CloudArrowDownIcon,
  ZOOM_IN: TbZoomIn,
  ZOOM_OUT: TbZoomOut,
  ZOOM_CENTER: TbZoomPan,
  THRASH: IoTrashOutline,
  DUPLICATE: HiDuplicate,
  EDIT: TbEdit,
  OPEN_WINDOW: BiWindowOpen,
  USERNAME: MdPerson,
  PASSWORD: BiLockAlt,
  LOGOUT: BiLogOut,
  CURVE: TbArrowCurveRight,
  ALIGN: MdAlignVerticalCenter,
  PAINT: RiPaintFill,
  RIGHT_ARROW_TRIANGLE: MdOutlineArrowRight,
  TEXT: BsTextParagraph,
  GROUP: FaRegObjectGroup,
  RESIZE: BsTextareaResize,
  VERTICAL_RESIZE: BsGripHorizontal,
  BACKGROUND: BsFillImageFill,
  DOWNLOAD: AiOutlineDownload,
  REFRESH: BiRefresh,
  LOADING: AiOutlineLoading3Quarters,
  SUCCESS: AiFillCheckCircle,
  ERROR: MdErrorOutline,
  UPLOAD: TiUploadOutline
};

export function getIconComp(iconName: IconName) {
  return SvgIcons[iconName];
}

export type IconName = keyof typeof SvgIcons;
