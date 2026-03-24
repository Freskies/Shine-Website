export interface CourseInfo {
	id: string;
	titleKey: string; // Translation key: kids, teens, adults
	ageRange: string;
	daysKeys: string[]; // Translation keys: mon, tue, etc.
	time: string;
	instructor: string; // Key in instructors record
	bannerImage: string;
}

export const coursesData: CourseInfo[] = [
	{
		id: 'kids-4-7',
		titleKey: 'kids',
		ageRange: '4–7',
		daysKeys: ['wed', 'fri'],
		time: '18:00-19:00',
		instructor: 'Libranti Federico',
		bannerImage: '/courses_banners/banner_4-7.avif'
	},
	{
		id: 'kids-8-9',
		titleKey: 'kids',
		ageRange: '8–9',
		daysKeys: ['tue', 'thu'],
		time: '17:00-18:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_8-9.avif'
	},
	{
		id: 'teen-10-11',
		titleKey: 'teens',
		ageRange: '10–11',
		daysKeys: ['mon', 'fri'],
		time: '18:00-19:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_10-11.avif'
	},
	{
		id: 'teen-12-13',
		titleKey: 'teens',
		ageRange: '12–13',
		daysKeys: ['tue', 'thu'],
		time: '18:30-20:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_12_13.avif'
	},
	{
		id: 'teen-14-16',
		titleKey: 'teens',
		ageRange: '14–16',
		daysKeys: ['mon', 'wed'],
		time: '18:30-20:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner 14-16.avif'
	},
	{
		id: 'adults-16-plus',
		titleKey: 'adults',
		ageRange: '16+',
		daysKeys: ['lun', 'thu'],
		time: '19:30-21:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_16+.jpg'
	}
];
