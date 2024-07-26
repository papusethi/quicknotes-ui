import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
	return (
		<Box
			py={2}
			display='flex'
			flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
		>
			<Box>
				<Typography variant='h5'>QuikNotes.</Typography>
			</Box>
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				gap={1}
			>
				<Button size='small'>Sign in</Button>
				<Button size='small' variant='contained' disableElevation>
					Create an account
				</Button>
			</Box>
		</Box>
	);
};

export default Header;
