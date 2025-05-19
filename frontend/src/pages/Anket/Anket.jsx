import React, { useState } from 'react';
import axios from '../../axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Anket = () => {
    const [availableAnket, setAvailableAnket] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        question1: { price1: false, price2: false, price3: false, price4: false, price5: false },
        question2: { option1: false, option2: false, option3: false, option4: false, option5: false, option6: false },
        question3: { option1: false, option2: false, option3: false, option4: false, option5: false },
        question4: { option1: false, option2: false, option3: false, option4: false, option5: false },
    });

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get(`/suggest/anket/${username}`);
                if (response.data) {
                    setAvailableAnket(1);
                    console.log('availableAnket:', availableAnket);
                    setFormData(response.data);
                    const decodedData = {
                        question1: {
                            price1: response.data.price.includes('price_15-20'),
                            price2: response.data.price.includes('price_25-50'),
                            price3: response.data.price.includes('price_50-100'),
                            price4: response.data.price.includes('price_100-150'),
                            price5: response.data.price.includes('price_151'),
                        },
                        question2: {
                            option1: response.data.favoriteFoods.includes('food_pho'),
                            option2: response.data.favoriteFoods.includes('food_banhmi'),
                            option3: response.data.favoriteFoods.includes('food_salad'),
                            option4: response.data.favoriteFoods.includes('food_fastfood'),
                            option5: response.data.favoriteFoods.includes('food_grilled'),
                            option6: response.data.favoriteFoods.includes('food_rice'),
                        },
                        question3: {
                            option1: response.data.favoriteFlavor.includes('flavor_sour'),
                            option2: response.data.favoriteFlavor.includes('flavor_spicy'),
                            option3: response.data.favoriteFlavor.includes('flavor_salty'),
                            option4: response.data.favoriteFlavor.includes('flavor_sweet'),
                            option5: response.data.favoriteFlavor.includes('flavor_balanced'),
                        },
                        question4: {
                            option1: response.data.dislikes.includes('ingre_sea'),
                            option2: response.data.dislikes.includes('ingre_eggs'),
                            option3: response.data.dislikes.includes('ingre_dairy'),
                            option4: response.data.dislikes.includes('ingre_meat'),
                            option5: response.data.dislikes.includes('none'),
                        },
                    };
                    setFormData(decodedData);
                } else {
                    setFormData({
                        question1: { price1: false, price2: false, price3: false, price4: false, price5: false },
                        question2: { option1: false, option2: false, option3: false, option4: false, option5: false, option6: false },
                        question3: { option1: false, option2: false, option3: false, option4: false, option5: false },
                        question4: { option1: false, option2: false, option3: false, option4: false, option5: false },
                    });
                }
            } catch (error) {
                console.error('Failed to fetch form data:', error);
            }
        };

        fetchFormData();
    }, []);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submit button pressed')
        const anketData = {
            username: localStorage.getItem('username'),
            price: '',
            favoriteFoods: '',
            favoriteFlavor: '',
            dislikes: '',
        };

        // Collect selected price ranges
        if (formData.question1.price1) anketData.price += 'price_15-20,';
        if (formData.question1.price2) anketData.price += 'price_25-50,';
        if (formData.question1.price3) anketData.price += 'price_50-100,';
        if (formData.question1.price4) anketData.price += 'price_100-150,';
        if (formData.question1.price5) anketData.price += 'price_151,';

        // Collect selected favorite foods
        if (formData.question2.option1) anketData.favoriteFoods += 'food_pho,';
        if (formData.question2.option2) anketData.favoriteFoods += 'food_banhmi,';
        if (formData.question2.option3) anketData.favoriteFoods += 'food_salad,';
        if (formData.question2.option4) anketData.favoriteFoods += 'food_fastfood,';
        if (formData.question2.option5) anketData.favoriteFoods += 'food_grilled,';
        if (formData.question2.option6) anketData.favoriteFoods += 'food_rice,';

        // Collect selected favorite flavors
        if (formData.question3.option1) anketData.favoriteFlavor += 'flavor_sour,';
        if (formData.question3.option2) anketData.favoriteFlavor += 'flavor_spicy,';
        if (formData.question3.option3) anketData.favoriteFlavor += 'flavor_salty,';
        if (formData.question3.option4) anketData.favoriteFlavor += 'flavor_sweet,';
        if (formData.question3.option5) anketData.favoriteFlavor += 'flavor_balanced,';

        // Collect selected dislikes
        if (formData.question4.option1) anketData.dislikes += 'ingre_sea,';
        if (formData.question4.option2) anketData.dislikes += 'ingre_eggs,';
        if (formData.question4.option3) anketData.dislikes += 'ingre_dairy,';
        if (formData.question4.option4) anketData.dislikes += 'ingre_meat,';
        if (formData.question4.option5) anketData.dislikes += 'none,';

        // Remove trailing commas
        anketData.price = anketData.price.replace(/,$/, '');
        anketData.favoriteFoods = anketData.favoriteFoods.replace(/,$/, '');
        anketData.favoriteFlavor = anketData.favoriteFlavor.replace(/,$/, '');
        anketData.dislikes = anketData.dislikes.replace(/,$/, '');

        console.log('Anket data:', anketData);

        console.log('Available anket:', availableAnket);
        if (availableAnket === 1) {
            console.log('Update anket');
            try {
                console.log('Delete anket');
                const response = await axios.delete(`/suggest/anket/${localStorage.getItem('username')}`);
                setAvailableAnket(0);
            } catch (err) {
                console.error('Failed to delete anket');
                setError("Failed to delete anket. Please try again.");
                setSuccess(null);
            }
        }

        try {
            console.log('Trying')
            const response = await axios.post("/suggest/anket", anketData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log('Anket created:', response.data);
                setSuccess("Anket created successfully!");
                setError(null);
                setFormData({
                    question1: { price1: false, price2: false, price3: false, price4: false, price5: false },
                    question2: { option1: false, option2: false, option3: false, option4: false, option5: false, option6: false },
                    question3: { option1: false, option2: false, option3: false, option4: false, option5: false },
                    question4: { option1: false, option2: false, option3: false, option4: false, option5: false },
                });

                navigate('/recommendations');
            }
        } catch (err) {
            console.error('Failed to create anket');
            setError("Failed to create anket. Please try again.");
            setSuccess(null);
        }
    };
    /*
    Price range: 1: 15-20k, 2: 25-50k, 3: 50-100k, 4:100-150k, 5: 150k+
    Favorite foods: 1: Pho, 2: Banh mi, 3: Salad, 4: Fast foods, 5: Grilled food, 6: Rice
    Favorite flavor: 1: Sour, 2: Spicy, 3: Salty, 4: Sweet, 5: Balanced
    dislikes/disliked: 1: Seafood, 2: Eggs, 3: Milk, 4: Meat, 5: None
    */
    const handleCancel = () => {
        setFormData({
            question1: { price1: false, price2: false, price3: false, price4: false, price5: false },
            question2: { option1: false, option2: false, option3: false, option4: false, option5: false, option6: false },
            question3: { option1: false, option2: false, option3: false },
            question4: { option1: false, option2: false, option3: false },
        });
    };

    const handleChange = (e) => {
        const { name, checked } = e.target;
        const [question, option] = name.split('.');

        if (question === 'question4' && option === 'option5' && checked) {
            setFormData({
                ...formData,
                question4: {
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false,
                    option5: true,
                },
            });
        } else if (question === 'question4') {
            setFormData({
                ...formData,
                question4: {
                    ...formData.question4,
                    [option]: checked,
                    option5: false,
                },
            });
        } else {
            setFormData({
                ...formData,
                [question]: {
                    ...formData[question],
                    [option]: checked,
                },
            });
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
            <p style={{ textAlign: 'center', fontSize: '70px' }}><strong>Bộ lọc</strong></p>
            <p style={{ textAlign: 'center', fontSize: '20px' }}></p>
            <form onSubmit={handleSubmit} encType="multipart/anket-data" style={{ backgroundColor: 'lightgray', width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}><strong>アンケート</strong></h1>
                <div style={{ paddingLeft: '50px', width: '100%', paddingTop: '25px' }}>
                    <label><h5><strong>Mức giá mong muốn</strong></h5></label>
                    <div className="options" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingLeft: '20px', width: '100%', paddingTop: '5px', fontSize: '18px' }}>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question1.price1"
                                checked={formData.question1.price1}
                                onChange={handleChange}
                            />
                            15 - 20k
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question1.price2"
                                checked={formData.question1.price2}
                                onChange={handleChange}
                            />
                            25 - 50k
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question1.price3"
                                checked={formData.question1.price3}
                                onChange={handleChange}
                            />
                            50 - 100k
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question1.price4"
                                checked={formData.question1.price4}
                                onChange={handleChange}
                            />
                            100 - 150k
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question1.price5"
                                checked={formData.question1.price5}
                                onChange={handleChange}
                            />
                            150k以上
                        </label>
                    </div>
                </div>
                <div style={{ paddingLeft: '50px', width: '100%', paddingTop: '25px' }}>
                    <label><h5><strong>Món ăn ưa thích</strong></h5></label>
                    <div className="options" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingLeft: '20px', width: '100%', paddingTop: '5px' }}>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option1"
                                checked={formData.question2.option1}
                                onChange={handleChange}
                            />
                            Phở
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option2"
                                checked={formData.question2.option2}
                                onChange={handleChange}
                            />
                            Bánh mì
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option3"
                                checked={formData.question2.option3}
                                onChange={handleChange}
                            />
                            Rau
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option4"
                                checked={formData.question2.option4}
                                onChange={handleChange}
                            />
                            Thức ăn nhanh
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option5"
                                checked={formData.question2.option5}
                                onChange={handleChange}
                            />
                            焼き物
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question2.option6"
                                checked={formData.question2.option6}
                                onChange={handleChange}
                            />
                            Cơm
                        </label>
                    </div>
                </div>
                <div style={{ paddingLeft: '50px', width: '100%', paddingTop: '25px' }}>
                    <label><h5><strong>Hương vị yêu thích</strong></h5></label>
                    <div className="options" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingLeft: '20px', width: '100%', paddingTop: '5px', fontSize: '18px' }}>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question3.option1"
                                checked={formData.question3.option1}
                                onChange={handleChange}
                            />
                            Chua
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question3.option2"
                                checked={formData.question3.option2}
                                onChange={handleChange}
                            />
                            Cay
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question3.option3"
                                checked={formData.question3.option3}
                                onChange={handleChange}
                            />
                            Mặn
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question3.option4"
                                checked={formData.question3.option4}
                                onChange={handleChange}
                            />
                            Ngọt
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question3.option5"
                                checked={formData.question3.option5}
                                onChange={handleChange}
                            />
                            Cân bằng
                        </label>
                    </div>
                </div>
                <div style={{ paddingLeft: '50px', width: '100%', paddingTop: '25px' }}>
                    <label><h5><strong>Bạn có bị dị ứng hoặc có bất kỳ hạn chế nào về chế độ ăn uống đối với các thành phần sau không?</strong></h5></label>
                    <div className="options" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', paddingLeft: '20px', width: '100%', paddingTop: '5px', fontSize: '18px' }}>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question4.option1"
                                checked={formData.question4.option1}
                                onChange={handleChange}
                            />
                            Hải sản
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question4.option2"
                                checked={formData.question4.option2}
                                onChange={handleChange}
                            />
                            卵
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question4.option3"
                                checked={formData.question4.option3}
                                onChange={handleChange}
                            />
                            牛乳
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question4.option4"
                                checked={formData.question4.option4}
                                onChange={handleChange}
                            />
                            肉
                        </label>
                        <label style={{ flex: '1 1 150px' }}>
                            <input
                                type="checkbox"
                                name="question4.option5"
                                checked={formData.question4.option5}
                                onChange={handleChange}
                            />
                            ありません
                        </label>
                    </div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
                    <button type="button" onClick={handleCancel} style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'gray', color: 'white' }}>CANCEL</button>
                    <button type="submit" onClick={handleSubmit} style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'red', color: 'white' }}>SUBMIT</button>
                </div>
            </form>
        </div>
    );
};

export default Anket;
