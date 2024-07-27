import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";

const Signin: React.FC = () => {
	return (
		<Container maxWidth='lg'>
			<Box py={8}>
				<Container maxWidth='sm'>
					<Box>
						<Typography
							component='a'
							href='/#'
							variant='h4'
							color='inherit'
							textAlign='center'
							display='block'
							sx={{ textDecoration: "none" }}
						>
							QuikNotes
						</Typography>
						<Typography variant='body2' textAlign='center'>
							sign in to your account to view your notes
						</Typography>
					</Box>
					<Box m={4}>
						<Card variant='outlined'>
							<CardContent>
								<Box display='flex' flexDirection='column' gap={2}>
									<TextField
										required
										fullWidth
										type='text'
										variant='standard'
										label='Username'
										size='small'
									/>
									<TextField
										required
										fullWidth
										type='password'
										variant='standard'
										label='Password'
										size='small'
									/>

									<Button size='small' variant='contained' disableElevation>
										Sign in me
										<ArrowForwardOutlinedIcon fontSize='small' sx={{ ml: 1 }} />
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Box>

					<Box textAlign='center'>
						<Typography variant='body2'>
							Geez, I'm new here,{" "}
							<Typography
								component='a'
								href='/signup'
								variant='body2'
								color='primary'
								sx={{
									textDecoration: "none",
									"&:hover": {
										textDecoration: "underline",
									},
								}}
							>
								Crete an account
							</Typography>
						</Typography>
						<Typography
							component='a'
							href='/signup'
							variant='body2'
							color='inherit'
							sx={{
								textDecoration: "none",
								"&:hover": {
									textDecoration: "underline",
								},
							}}
						>
							Privacy policy
						</Typography>
					</Box>
				</Container>
			</Box>
		</Container>
	);
};

export default Signin;
