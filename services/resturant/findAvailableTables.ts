import { PrismaClient, Table } from "@prisma/client";
import { times } from "../../data";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type AvailibleTables = {
	time: string;
	day: string;
	restaurant: {
		tables: Table[];
		open_time: string;
		close_time: string;
	};
};
type Tables = {
	date: Date;
	time: string;
	tables: Table[];
};

export const findAvailabileTables = async ({
	time,
	day,
	restaurant,
}: AvailibleTables) => {
	const searchTimes = times.find((t) => {
		return t.time === time;
	})?.searchTimes;

	if (!searchTimes) {
		return NextResponse.json(
			{ errorMessage: "Invalid data provided" },
			{ status: 400 }
		);
	}

	const bookings = await prisma.booking.findMany({
		where: {
			booking_time: {
				gte: new Date(`${day}T${searchTimes[0]}`),
				lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
			},
		},
		select: {
			number_of_people: true,
			booking_time: true,
			tables: true,
		},
	});

	const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

	bookings.forEach((booking) => {
		bookingTablesObj[booking.booking_time.toISOString()] =
			booking.tables.reduce((obj, table) => {
				return {
					...obj,
					[table.table_id]: true,
				};
			}, {});
	});

	const tables = restaurant.tables;

	const searchTimesWithTables = searchTimes.map((searchTime) => {
		return {
			date: new Date(`${day}T${searchTime}`),
			time: searchTime,
			tables,
		};
	});

	searchTimesWithTables.forEach((t) => {
		t.tables = t.tables.filter((table) => {
			if (bookingTablesObj[t.date.toISOString()]) {
				if (bookingTablesObj[t.date.toISOString()][table.id])
					return false;
			}
			return true;
		});
	});

	return searchTimesWithTables as Tables[];
};
