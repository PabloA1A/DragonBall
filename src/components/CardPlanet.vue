<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    isDestroyed: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="card bg-card position-relative rounded-2">
        <div class="side text-white">
            <img :src="image" class="image-size" :alt=name>
            <div class="card-img-overlay">
                <div class="position-absolute bg-black rounded bottom-0 start-0 p-2 m-2">
                    <p class="m-0"><strong>Name:</strong> {{ name }}</p>
                    <p class="m-0"><strong>Is destroyed:</strong> {{ isDestroyed ? 'Yes' : 'Not' }}</p>
                    <p class="card-text" hidden>{{ description }}</p>
                </div>
            </div>
        </div>
        <div class="side back">
            <div class="position-absolute p-3">
                <p class="font-monospace">{{ description }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.bg-card {
    background-color: #A9AAAD;
    height: 300px;
    border: 0;
}

.image-size {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card {
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
}

.card:hover {
    transform: rotateY(180deg);
}

.card .side {
    backface-visibility: hidden;
    border-radius: 6px;
    height: 100%;
    position: absolute;
    overflow: hidden;
    width: 100%;
}

.card .back {
    transform: rotateY(180deg);
}
</style>
