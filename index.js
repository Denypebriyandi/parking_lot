const readline = require('readline');
const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let capacity = 0;
let slot = [];
let car = [];

let park = () => {
    line.on('line', async (input) => {
        const state = input.split(" ");
        if (state[0] === 'create_parking_lot') {
            let jml_slot = state[1];
            try {
                capacity = parseInt(jml_slot); // update capacity
            } catch (error) {
                console.log('Not Number');
            }
            // membuat slot sesuai inputan yang dikirim
            console.log('Created parking lot with '+jml_slot+' slots');
            for (let i = 1; i <= capacity; i++) {
                slot.push(i);
                console.log('Allocated slot number: '+i);
            }
            // console.log(slot);
        } else if (state[0] === 'park') {
            let car_number = state[1];
            if (capacity === 0) { // cek buat slot
                console.log('parking lot is not created');
            } else if (capacity === car.length) { // cek slot
                console.log('Sorry, parking lot is full');
            } else {
                let s = slot[0]; // mengambil slot array pertama
                let d = [];
                for (let i = 0; i < car.length; i++) {
                    const n = car[i];
                    if (n === car_number) { // cek car number, apa sudah ada sebelumnya / tidak
                        d.push(i);
                    }
                }
                if (d.length > 0) { // jika ada
                    console.log('Registration number '+car_number+' is exist');
                } else {
                    car.push(car_number); // push car_number
                    slot.shift(); // hapus array pertama
                    console.log('Registration number '+car_number+' with Slot Number '+s);
                }
            }
        } else if (state[0] === 'leave') {
            let car_number = state[1];
            if (capacity === 0) { // cek buat slot
                console.log('parking lot is not created');
            } else if (car.length > 0) { // cek array car
                let d = [];
                for (let i = 0; i < car.length; i++) {
                    const n = car[i];
                    if (n === car_number) { // cek car_number ada / tidak
                        d.push(i);
                    }
                }
                if (d.length > 0) { // jika ada
                    car.splice(d,1); // hapus car_number
                    slot.push(d[0]); // push slot yang baru di hapus
                    slot.sort(); // sort array slot
                    console.log('Slot  number '+d+' is free');
                } else { // jika tidak ada
                    console.log('Registration number '+car_number+' not found');
                }
            } else { 
                console.log('Parking lot is empty');
            }
        } else if (state[0] === 'status') {
            console.log('Slot No. Registration No.');
            no = 1;
            for (let i = 0; i < car.length; i++) {
                nom = no++;
                const car_number = car[i];
                console.log(nom+' '+car_number);
            }
        }
    })
}

line.on('SIGINT', () => {
    line.question('Are you sure you want to exit? (yes/no) ', (answer) => {
        if (answer.match(/^y(es)?$/i)) line.pause();
    });
}); 

park();