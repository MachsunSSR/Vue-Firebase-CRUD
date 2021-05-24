<template>
    <div class="card card-body mt-4">
        <h3>Edit users</h3>
        <form @submit.prevent="update">
            <div class="form-group">
                <label>Nama</label>
                <input v-model="form.nama" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Nim</label>
                <input v-model="form.nim" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Prodi</label>
                <input v-model="form.prodi" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Email</label>
                <input
                    v-model="form.email"
                    class="form-control"
                    type="email"
                    required
                />
            </div>

            <button type="submit" class="btn btn-primary mt-3">
                Update User
            </button>
        </form>
    </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUser, updateUser } from "@/firebase";

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const userId = computed(() => route.params.id);

        const form = reactive({ nama: "", nim: "", prodi: "", email: "" });
        onMounted(async () => {
            const user = await getUser(userId.value);
            console.log(user, userId.value);
            form.nama = user.nama;
            form.nim = user.nim;
            form.prodi = user.prodi;
            form.email = user.email;
        });

        const update = async () => {
            await updateUser(userId.value, { ...form });
            router.push("/");
            form.nama = "";
            form.nim = "";
            form.prodi = "";
            form.email = "";
        };

        return { form, update };
    },
};
</script>
