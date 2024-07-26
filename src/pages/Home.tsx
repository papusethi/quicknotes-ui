import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Divider,
	Typography,
} from "@mui/material";
import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
	return (
		<Container>
			<Header />
			<Divider />

			{/* Hero section */}
			<Container maxWidth='md'>
				<Box py={8}>
					<Typography variant='h2' fontWeight={500} textAlign='center'>
						QuikNotes
					</Typography>
					<Typography mt={2} textAlign='center'>
						QuikNote is your pocket-sized digital notepad in the cloud. Jot down
						quick ideas, create to-do lists, or save important information
						effortlessly. Access your notes anytime, anywhere from your
						computer, smartphone, or tablet. With QuikNote, your thoughts are
						always just a tap away, ensuring they're never lost or forgotten.
					</Typography>
					<Box mt={4} display='flex' justifyContent='center' gap={2}>
						<Button variant='outlined' size='small'>
							<PlayCircleOutlinedIcon
								fontSize='small'
								sx={{ marginRight: 1 }}
							/>
							Get Demo
						</Button>
						<Button variant='contained' size='small' disableElevation>
							Create a Note
						</Button>
					</Box>
				</Box>
			</Container>

			<Divider />

			{/* Services section */}
			<Container maxWidth='md'>
				<Box py={8}>
					<Typography variant='h4' fontWeight={500} textAlign='center'>
						Services
					</Typography>
					<Typography textAlign='center'>
						explore more of our digital products to keep your thoughts
					</Typography>
					<Box mt={4} display='flex' justifyContent='center' gap={2}>
						<Card variant='outlined'>
							<CardContent>
								<DrawOutlinedIcon fontSize='large' color='primary' />
								<Typography variant='h6' fontWeight={500}>
									QuikDraw
								</Typography>
								<Typography variant='body2' my={2}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
									neque nostrum amet voluptatum, necessitatibus error.
								</Typography>

								<Button size='small'>
									Try it
									<ArrowOutwardIcon fontSize='small' sx={{ ml: 0.5 }} />
								</Button>
							</CardContent>
						</Card>

						<Card variant='outlined'>
							<CardContent>
								<DesignServicesOutlinedIcon
									fontSize='large'
									color='secondary'
								/>
								<Typography variant='h6' fontWeight={500}>
									QuikDesign
								</Typography>
								<Typography variant='body2' my={2}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
									neque nostrum amet voluptatum, necessitatibus error.
								</Typography>
								<Button size='small'>
									Try it
									<ArrowOutwardIcon fontSize='small' sx={{ ml: 0.5 }} />
								</Button>
							</CardContent>
						</Card>

						<Card variant='outlined'>
							<CardContent>
								<ArchitectureOutlinedIcon fontSize='large' color='warning' />
								<Typography variant='h6' fontWeight={500}>
									QuikJam
								</Typography>
								<Typography variant='body2' my={2}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
									neque nostrum amet voluptatum, necessitatibus error.
								</Typography>

								<Button size='small'>
									Try it
									<ArrowOutwardIcon fontSize='small' sx={{ ml: 0.5 }} />
								</Button>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Container>

			<Divider />

			{/* Pricing section */}
			<Container maxWidth='md'>
				<Box py={8}>
					<Typography variant='h4' fontWeight={500} textAlign='center'>
						Plans & Features
					</Typography>
					<Typography textAlign='center'>
						pick your plans and explore the features
					</Typography>
					<Box mt={4} display='flex' justifyContent='center' gap={2}>
						<Box flex={1}>
							<Card variant='outlined'>
								<CardContent>
									<Box
										display='flex'
										flexDirection='row'
										alignItems='center'
										justifyContent='space-between'
									>
										<Typography variant='h6' fontWeight={500}>
											Basic
										</Typography>
										<Chip
											label='Free'
											size='small'
											variant='outlined'
											color='warning'
										/>
									</Box>
									<Box my={2}>
										<ul>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Note Creation:
												</Typography>
												<Typography component='span' variant='body2'>
													Simple text-based note creation
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Basic Formatting:
												</Typography>
												<Typography component='span' variant='body2'>
													Bold, italics, underline, bullet points, numbered
													lists
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Note Search:
												</Typography>
												<Typography component='span' variant='body2'>
													Basic search functionality within notes
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Note Sharing:
												</Typography>
												<Typography component='span' variant='body2'>
													Option to share notes via email or other basic sharing
													methods
												</Typography>
											</li>
										</ul>
									</Box>

									<Button size='small'>
										Buy now
										<ArrowOutwardIcon fontSize='small' sx={{ ml: 0.5 }} />
									</Button>
								</CardContent>
							</Card>
						</Box>

						<Box flex={1}>
							<Card variant='outlined'>
								<CardContent>
									<Box
										display='flex'
										flexDirection='row'
										alignItems='center'
										justifyContent='space-between'
									>
										<Typography variant='h6' fontWeight={500}>
											Professional
										</Typography>
										<Chip
											label='$0.25/month'
											size='small'
											variant='outlined'
											color='info'
										/>
									</Box>

									<Box my={2}>
										<ul>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Extended Basic:
												</Typography>
												<Typography component='span' variant='body2'>
													All features of basic plan
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Checklists:
												</Typography>
												<Typography component='span' variant='body2'>
													Create to-do lists within notes.
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Image Attachment:
												</Typography>
												<Typography component='span' variant='body2'>
													Ability to add images to notes
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Reminder Alerts:
												</Typography>
												<Typography component='span' variant='body2'>
													Set reminders for specific notes
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Offline Access:
												</Typography>
												<Typography component='span' variant='body2'>
													Access notes without an internet connection
												</Typography>
											</li>
											<li>
												<Typography
													component='span'
													variant='body2'
													fontWeight={600}
												>
													Note Organization:
												</Typography>
												<Typography component='span' variant='body2'>
													Directory or label system for note categorization
												</Typography>
											</li>
										</ul>
									</Box>
									<Button size='small'>
										Buy now
										<ArrowOutwardIcon fontSize='small' sx={{ ml: 0.5 }} />
									</Button>
								</CardContent>
							</Card>
						</Box>
					</Box>
				</Box>
			</Container>

			<Divider />

			{/* Footer section */}
			<Container>
				<Box py={8}></Box>
			</Container>

			<Divider />

			{/* Copyright section */}
			<Container>
				<Box py={2}>
					<Typography variant='body2'>
						&copy; Copyright 2024 | All Rights Reserved.
					</Typography>
				</Box>
			</Container>
		</Container>
	);
};

export default Home;
