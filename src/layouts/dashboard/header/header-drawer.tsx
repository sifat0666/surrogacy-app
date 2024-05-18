import { Box, Drawer, List, Typography } from "@mui/material";
import { CustomAccordion } from "./custom-dropdown";
import Link from "next/link";
import { styles } from "./header.styles";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "@/layouts/admin/sidebar/sidebar";
import { getSessionStorage } from "@/utils/session-storage";

interface HeaderDrawerInterface {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const HeaderDrawer = (props: HeaderDrawerInterface) => {
  const { open, onClose, data } = props;
  const isAuthorization = getSessionStorage('isAuthenticated');

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box textAlign="right" p="20px" onClick={onClose}>
        <CloseIcon sx={{ color: "grey.500", fontSize: "28px" }} />
      </Box>
      {isAuthorization ? (
        <Sidebar rootSx={{ boxShadow: 'none', mx: 3, mb: 4 }} />
      ) : (
        <List sx={styles.menuList}>
          {data?.map((item: any) =>
            item?.isSubMenu ? (
              <CustomAccordion key={item?.id} title={item?.title} data={item?.submenu} />
            ) : (
              <Typography sx={styles.menuItem} key={item?.id}>
                <Link href={item?.path ? item?.path : ""}>{item?.title}</Link>
              </Typography>
            )
          )}
        </List>
      )}
    </Drawer>
  );
};
