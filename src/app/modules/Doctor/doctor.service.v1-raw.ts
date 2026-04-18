// import { IQueryParams } from "../../interfaces/query.interface"

import { totalmem } from "node:os";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma";


type QueryParams = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    fields?: string;
    includes?: string;
    [key: string]: string | undefined;


    // filterable fields
    gender?: string;
    experiance?: string;

}

const getAllDoctors = async (query: QueryParams) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit; // memorized 

    //sort order
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

    let orderBy: Record<string, unknown>

    // filter by relation
    if (sortBy.includes(".")) {
        const [relation, field] = sortBy.split(".")
        orderBy = {
            [relation]: {
                [field]: sortOrder
            }
        }
    } else {
        orderBy = {
            [sortBy]: sortOrder
        }
    }

    //search

    const searchConditions: Prisma.DoctorWhereInput[] = [];
    const searchTerm = query.searchTerm || '';

    const searchableFields = ["name", "designation", "address"];
    if (searchTerm) {

        // searchConditions.push({
        //     OR: searchableFields.map((field) => ({
        //         [field]: {
        //             contains: query.searchTerm,
        //             mode: "insensitive",
        //         }
        //     }))
        // })

        searchableFields.forEach((field) => {
            searchConditions.push({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                }
            })
        })

        searchConditions.push({
            specialities: {
                some: {
                    specialty: {
                        title: {
                            contains: searchTerm,
                            mode: "insensitive",
                        }
                    }
                }
            }
        })

    }


    //fields
    const fields = query.fields || '';

    //includes
    const includes = query.includes || '';
    const gender = query.gender || '';
    const experiance = query.experiance || '';

    // console.log(query);

    const doctors = await prisma.doctor.findMany({
        where: {
            OR: searchConditions.length > 0 ? searchConditions : undefined
        },
        skip, take: limit,
        orderBy,
        include: {
            specialities: {
                include: {
                    specialty: true
                }
            }
        }

    })
    return {
        data: doctors,
        meta: {
            page,
            limit,
            total: doctors.length,
            totalPages: Math.ceil(doctors.length / limit)
        }
    }
}

export const DoctorServiceV1Raw = {
    getAllDoctors
}   