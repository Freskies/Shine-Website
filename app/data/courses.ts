export interface CourseInfo {
	id: string;
	titleKey: string; // Translation key: kids, teens, adults
	ageRange: string;
	schedule: string;
	instructor: string; // Key in instructors record
	bannerImage: string;
}

export const coursesData: CourseInfo[] = [
	{
		id: 'kids-4-7',
		titleKey: 'kids',
		ageRange: '4–7',
		schedule: 'Mon/Wed 16:00',
		instructor: 'Libranti Federico',
		bannerImage: '/courses_banners/banner_4-7.avif'
	},
	{
		id: 'kids-8-9',
		titleKey: 'kids',
		ageRange: '8–9',
		schedule: 'Tue/Thu 17:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_8-9.avif'
	},
	{
		id: 'teen-10-11',
		titleKey: 'teens',
		ageRange: '10–11',
		schedule: 'Mon/Wed 17:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_10-11.avif'
	},
	{
		id: 'teen-12-13',
		titleKey: 'teens',
		ageRange: '12–13',
		schedule: 'Tue/Thu 18:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_12_13.avif'
	},
	{
		id: 'teen-14-16',
		titleKey: 'teens',
		ageRange: '14–16',
		schedule: 'Mon/Wed 18:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner 14-16.avif'
	},
	{
		id: 'adults-16-plus',
		titleKey: 'adults',
		ageRange: '16+',
		schedule: 'Fri 19:00',
		instructor: 'Fogli Giacomo',
		bannerImage: '/courses_banners/banner_16+.jpg'
	}
];
