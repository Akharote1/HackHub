import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import {
	faCalendarAlt,
	faCaretDown,
	faChartPie,
	faEnvelope,
	faPizzaSlice,
	faRocket,
	faShield,
	faShieldAlt,
	faUniversity,
	faUserPlus,
	faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

const Sidebar = () => {
	const router = useRouter();
	const slug = router.query.slug;

	const navLinks = [
		{
			title: 'Dashboard',
			icon: faChartPie,
			href: `/myhackathon/${slug}`,
			pathname: '/myhackathon/[slug]'
		},
		{
			title: 'Registrations',
			icon: faRocket,
			href: `/myhackathon/${slug}/registrations`,
			pathname: '/myhackathon/[slug]/registrations'
		},
		{
			title: 'Screening',
			href: `/myhackathon/${slug}/screening`,
			icon: faShieldAlt,
			pathname: '/myhackathon/[slug]/screening'
		},
		{
			title: 'Problem Statements',
			icon: faBuilding,
			href: `/myhackathon/${slug}/statements`,
			pathname: '/myhackathon/[slug]/statements'
		},
		{
			title: 'Submissions',
			icon: faBuilding,
			href: `/myhackathon/${slug}/submissions`,
			pathname: '/myhackathon/[slug]/submissions'
		},
		{
			title: 'Communication',
			icon: faEnvelope,
			href: `/myhackathon/${slug}/communication`,
			pathname: '/myhackathon/[slug]/communication'
		},
	];

	return (
		<div className='sidebar'>
			<div>
				{navLinks.map((item, i) => {
					return <SidebarItem key={i} item={item} />;
				})}
			</div>
		</div>
	);
};

const SidebarItem = ({ item }) => {
	const router = useRouter();
	const isSelected = item?.pathname == router.pathname || item.href == router.asPath;

	return (
		<Link href={item.href || '/'} legacyBehavior>
			<a className={`sidebar-item ${isSelected ? 'selected' : ''}`}>
				<FontAwesomeIcon icon={item.icon} />
				<span>{item.title}</span>
			</a>
		</Link>
	);
};

export default Sidebar;
