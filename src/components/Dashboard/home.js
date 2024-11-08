import { useRef } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore/lite';

const Home = () => {
    const form = useRef();

    const submitPortfolio = async (e) => {
        e.preventDefault();
        
        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        const url = form.current[2]?.value;
        const image = form.current[3]?.files[0];

        if (!image) {
            alert("Please select an image file");
            return;
        }

        try {
            // อัปโหลดไฟล์ภาพไปที่ Firebase Storage
            const storageRef = ref(storage, `portfolio/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            // บันทึกข้อมูลลง Firestore
            await savePortfolio({
                name,
                description,
                url,
                image: downloadUrl
            });

            alert("Portfolio added successfully!");
            form.current.reset(); // รีเซ็ตฟอร์มหลังจากสำเร็จ
        } catch (error) {
            console.error("Error uploading image or saving portfolio:", error);
            alert("Failed to add portfolio. Please try again.");
        }
    };

    const savePortfolio = async (portfolio) => {
        await addDoc(collection(db, 'portfolio'), portfolio);
    };

    return (
        <div className="dashboard">
            <form ref={form} onSubmit={submitPortfolio}>
                <p><input type="text" placeholder="Name" required /></p>
                <p><textarea placeholder="Description" required /></p>
                <p><input type="text" placeholder="Url" required /></p>
                <p><input type="file" accept="image/*" required /></p>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => auth.signOut()}>Sign out</button>
            </form>
        </div>
    );
};

export default Home;
