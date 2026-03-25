export interface CourseInfo {
	id: string;
	titleKey: string; // Translation key: kids, teens, adults
	descriptionKey: string; // Translation key: kids, teens, adults
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
		descriptionKey: 'kids-4-7',
		ageRange: '4–7',
		daysKeys: ['wed', 'fri'],
		time: '18:00-19:00',
		instructor: 'Libranti Federico',
		bannerImage: '/courses_banners/banner_4-7.avif'
	},
	{
		id: 'kids-8-9',
		titleKey: 'kids',
		descriptionKey: 'kids-8-9',
		ageRange: '8–9',
		daysKeys: ['tue', 'thu'],
		time: '17:00-18:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_8-9.avif'
	},
	{
		id: 'teen-10-11',
		titleKey: 'teens',
		descriptionKey: 'teen-10-11',
		ageRange: '10–11',
		daysKeys: ['mon', 'fri'],
		time: '18:00-19:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_10-11.avif'
	},
	{
		id: 'teen-12-13',
		titleKey: 'teens',
		descriptionKey: 'teen-12-13',
		ageRange: '12–13',
		daysKeys: ['tue', 'thu'],
		time: '18:30-20:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_12_13.avif'
	},
	{
		id: 'teen-14-16',
		titleKey: 'teens',
		descriptionKey: 'teen-14-16',
		ageRange: '14–16',
		daysKeys: ['mon', 'wed'],
		time: '18:30-20:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner 14-16.avif'
	},
	{
		id: 'adults-16-plus',
		titleKey: 'adults',
		descriptionKey: 'adults-16-plus',
		ageRange: '16+',
		daysKeys: ['mon', 'thu'],
		time: '19:30-21:30',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_16+.jpg'
	}
];
