import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import {
	faCalendarAlt,
	faCaretDown,
	faChartPie,
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
	const navLinks = [
		{
			title: 'Dashboard',
			icon: faChartPie,
			href: '/event/dashboard'
		},
		{
			title: 'Registrations',
			icon: faRocket,
			href: '/event/registrations',
		},
		{
			title: 'Screening',
			href: '/event/screening',
			icon: faShieldAlt,
		},
		{
			title: 'Problem Statements',
			icon: faBuilding,
			href: '/event/problems',
		},
		{
			title: 'Submissions',
			icon: faBuilding,
			href: '/event/submissions',
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
	const isSelected = item.href == router.asPath;

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
