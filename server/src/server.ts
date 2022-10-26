import express, { json, response } from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors({}));


// MÉTODOS DO TEAM

app.get("/times", async (request, response) => {
    const times = await prisma.team.findMany({
        select:{
            id: true,
            manager: true,
            name: true,
            players: true,
            bannerUrl: true
        },
        
    });

    return response.json(times);

    // return response.json(times.map((time) => {
    //     return {
    //         ...time,
    //         players: time.players.map((p) => {
    //             return [p.name, p.position]
    //         })
    //     }
    // }));
})

app.get("/time/:id", async (request, response) => {
    const id = request.params.id;
    
    const time = await prisma.team.findMany({
        select:{
            id: true,
            name: true,
            manager: true,
            players: true,
        },
        where: {
            id: id
        }
    })

    return response.json(time);
})


app.post("/time", async (request, response) => {

    const body: any = request.body;

    const team = await prisma.team.create({
        data:{
            bannerUrl: body.bannerUrl,
            manager: body.manager,
            name: body.name
        }
    })

    return response.status(201).json(team);
})

app.delete("/time/:id", async (request, response) => {

    const id = request.params.id;

    const time = await prisma.team.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            manager: true,
            players: true,
        }
    })

    return response.json(time);

})

app.put("/time/:id", async (request, response) => {

    const id = request.params.id;

    const body : any = request.body;

    const time = await prisma.team.update({
        where: {
            id: id
        },
        data: {
            bannerUrl: body.bannerUrl,
            name: body.name,
            manager: body.manager
        },
    })

    return response.json(time);

})

// MÉTODOS DE PLAYER

app.get("/players", async (request, response) => {
    const players = await prisma.player.findMany({
        select: {
            id: true,
            name: true,
            position: true,
            team: true,
        }
    })

    return response.json(players);
})

app.get("/player/:id", async (request, response) => {

    const id = request.params.id;

    const players = await prisma.player.findMany({
        select: {
            id: true,
            name: true,
            position: true,
            team: true,
        },
        where: {
            id: id
        }
    })

    return response.json(players);
})


app.post("/player/:id", async (request, response) => {

    const id = request.params.id;

    const body: any = request.body;

    const player = await prisma.player.create({
        data:{
            teamId: id,
            name: body.name,
            position: body.position,
        }
    });


    return response.status(201).json(player);

})


app.put("/player/:id", async (request, response) => {

    const id = request.params.id;

    const body : any = request.body;

    const time = await prisma.player.update({
        where: {
            id: id
        },
        data: {
            name: body.name,
            position: body.position,
            teamId: body.teamId
        },
    })

    return response.json(time);

})


app.delete("/player/:id", async (request, response) => {

    const id = request.params.id;

    const time = await prisma.player.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            position: true,
            team: true
        }
    })

    return response.json(time);

})

app.listen(3332);