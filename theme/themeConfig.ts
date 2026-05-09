import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#01F0D0',
    colorPrimaryBg: "#0C111C",
    fontFamily: "'Tahoma', 'Sans-Serif', 'Arial', 'Helvetica', sans-serif",
  },
  components: {
    Menu: {
      itemColor: "#8799B6",
      itemActiveBg: "rgba(254, 213, 0, 0.2)",
      itemSelectedBg: "#670316",
      itemSelectedColor: "#2E2E2E",
      itemMarginBlock: 2,
      activeBarHeight: 6,
      subMenuItemSelectedColor: "#8799B6",
      fontSize: 16,
    },
    Card: {
      colorBgContainer:"#0E121F",
      colorBorder: "#0E121F",
    },
    Input: {
      controlHeightLG: 48,
      borderRadius: 5,
      controlHeight: 48,
      colorBorder: "#404040",
      colorText:"#fff"
    },
    InputNumber: {
      controlHeightLG: 48,
      borderRadius: 5,
      controlHeight: 48,
      colorBorder: "#404040",
      colorText:"#fff"
    },
    DatePicker: {
      controlHeightLG: 40,
      borderRadius: 5,
      controlHeight: 40,
    },
    Select: {
      // colorTextPlaceholder: "#6B6B6B",
      // colorBorder: "#C4C4C4",
      controlHeightLG: 40,
      controlHeight: 40,
      borderRadius: 5,
      // borderRadiusLG:5,
      // colorBgContainer: "#F5F5F5",
      // fontSizeLG: 14,
    },
    Form: {
      labelColor: "#fff",
      labelFontSize: 14,
      colorTextPlaceholder: "#49556B"
    },
    Button: {
      borderRadius: 12,
      controlHeight: 41,
      // defaultHoverBorderColor: "#0E0B0A",
      padding: 18,
      // colorBorder:"#646464",
      // defaultBorderColor:"#646464",
      colorText:"#EDEDED",
      colorBgContainer: "transparent",
      fontWeight: 700
    },
    Upload:{
      fontSize:14
    },
    Tabs: {
      itemColor: "#FFFFFF",
      fontSize: 16,
      fontWeightStrong: 700,
      colorText: "#FFFFFF",
      itemActiveColor: "#fff"
    },
    Pagination: {
      colorBgTextActive: "blue",
      colorPrimary: "#AFBED7",
      colorTextDisabled: "rgba(0, 0, 0, 0.25)",
      // : "#f9f5ff"
      // colorText: "#670316"
    },
    Checkbox: {
      colorTextDisabled: "#AFBED7",
    },
    Breadcrumb: {
      colorLinkActive: "#fff",
      colorPrimaryText: "#8799B6",
      colorPrimary: "#8799B6"
    },
    Layout: {
      colorBgContainer:""
    }
  }
};
